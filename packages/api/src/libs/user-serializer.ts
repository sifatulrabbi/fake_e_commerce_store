export function userSerializer(
  user: {_id: string; email: string},
  done: (err: any, id?: string) => void,
): void {
  done(null, user._id);
}
