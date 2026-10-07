import { db } from '../db';
import { dailyUsage } from '../db/schema';
import { eq, and } from 'drizzle-orm';

export const MAX_DAILY_FREE_GENERATIONS = 10;

export async function checkAndUpdateDailyLimit(
  userId: string,
  hasUserApiKey: boolean = false
): Promise<{ allowed: boolean; remaining: number; currentCount: number }> {
  // BYOK users bypass the daily cap completely
  if (hasUserApiKey) {
    return { allowed: true, remaining: 999, currentCount: 0 };
  }

  const todayStr = new Date().toISOString().split('T')[0];

  try {
    const [record] = await db
      .select()
      .from(dailyUsage)
      .where(and(eq(dailyUsage.userId, userId), eq(dailyUsage.date, todayStr)));

    if (!record) {
      // First generation today
      await db.insert(dailyUsage).values({
        userId,
        date: todayStr,
        generationCount: 1,
      });
      return { allowed: true, remaining: MAX_DAILY_FREE_GENERATIONS - 1, currentCount: 1 };
    }

    if (record.generationCount >= MAX_DAILY_FREE_GENERATIONS) {
      return {
        allowed: false,
        remaining: 0,
        currentCount: record.generationCount,
      };
    }

    // Increment count
    const newCount = record.generationCount + 1;
    await db
      .update(dailyUsage)
      .set({ generationCount: newCount })
      .where(eq(dailyUsage.id, record.id));

    return {
      allowed: true,
      remaining: MAX_DAILY_FREE_GENERATIONS - newCount,
      currentCount: newCount,
    };
  } catch (error) {
    console.error('Rate limit check error:', error);
    // On DB error, allow request so user is not blocked
    return { allowed: true, remaining: 5, currentCount: 1 };
  }
}
