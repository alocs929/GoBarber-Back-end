// import uploadConfig from '@config/upload';
import IStorageProvider from '../models/IStorageProvider';

class FakeStorageProvider implements IStorageProvider {
  private storage: string[] = [];

  public async saveFile(file: string): Promise<string> {
    this.storage.push(file);
    return file;
  }

  public async deleteFile(file: string): Promise<void> {
    const findIndex = this.storage.findIndex(sto => sto === file);
    this.storage.splice(findIndex, 1);
  }
}

export default FakeStorageProvider;
