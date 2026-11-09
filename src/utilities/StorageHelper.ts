export default class StorageHelper {
  static set<T>(key: string, value: T): true {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch {
      throw new Error(`Error on save data in localStorage (key: ${key})`);
    }
  }

  static get<T>(key: string): T {
    const serializedValue = localStorage.getItem(key);
    if (serializedValue === null) {
      throw new Error(`No data in localStorage for key: ${key}`);
    }

    try {
      return JSON.parse(serializedValue) as T;
    } catch {
      throw new Error(`Error on parse data from localStorage (key: ${key})`);
    }
  }
}
