import { AuthProvider } from 'src/features/psn/auth/auth.provider';

export async function autoRefresh<T>(
  authProvider: AuthProvider,
  callback: (token: string) => Promise<T>,
) {
  try {
    const token = authProvider.getAuth().access_token;
    return callback(token);
  } catch (_) {
    await authProvider.refresh();
    const token = authProvider.getAuth().access_token;
    return callback(token);
  }
}
