/** Credits every new account starts with. */
export const FREE_CREDITS = 50

/**
 * Placeholder until credits live in the database.
 * Swap the body for a Supabase query; callers won't need to change.
 */
export async function getCredits(userId: string) {
  void userId
  return { remaining: FREE_CREDITS, total: FREE_CREDITS }
}
