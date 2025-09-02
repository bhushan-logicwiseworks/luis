import { fromEvent } from 'rxjs';
import { map } from 'rxjs/operators';
import { FileReaderEvent } from '../interfaces/user/fileReaderEvent';

export function fileReader(file: File) {
    const reader = new FileReader();
    const event = fromEvent(reader, 'load').pipe(
        map((f: FileReaderEvent) => ({
            fileBlob: f.target.result.substr(f.target.result.indexOf(',') + 1),
            modifiedDate: new Date(file.lastModified),
            displayName: file.name,
            fileName: file.name,
            originalName: file.name,
            contentType: file.type,
            contentSize: file.size,
            isDeleted: false,
            isPrivate: false,
            fileType: '0',
        }))
    );
    reader.readAsDataURL(file);
    return event;
}
