type ArrayItemWithId<T> = {
   id: T
}

export function findById<T, F extends ArrayItemWithId<T>>(
   arr: F[],
   id: T,
): F | undefined {
   return arr.find((item) => item.id === id)
}

export function filterById<T, F extends ArrayItemWithId<T>>(arr: F[], id: T): F[] {
   return arr.filter((item) => item.id !== id)
}
