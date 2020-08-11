export default interface IStorageProvider {
  saveFalie(file: string): Promise<string>;
  deleteFile(file: string): Promise<void>;
}
