import { HttpClient, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Backend } from 'app/core/services/backend';
import {
    File,
    FileResponse,
    FolderComplete,
    FolderCompleteResponse,
    FolderTree,
    FolderTreeResponse,
    Notification,
    RawFolderTreeResponse,
    Tag,
    VaultComplete,
    VaultCompleteResponse,
} from 'app/shared/interfaces/user/vault-api.interface';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { lowerCaseKeysInArrayOfObjects } from '../utils/lowercaseKeys';

/*****
  Operations
  vaulthello: `${url}/api/Vault/hello`,
  vaultgetvaults: `${url}/api/Vault/getvaults`,
  vaultgetfolders: (vaultid) => `${url}/api/Vault/getfolders/${vaultid}`,
  vaultgetfoldertree: vaultid => `${url}/api/Vault/getfoldertree/${vaultid}`,
  vaultgetfiles: folderid => `${url}/api/Vault/getfiles/${folderid}`,

  vaultsavefolder: `${url}/api/Vault/savefolder`,
  vaultsavevault: `${url}/api/Vault/savevault`,
  vaultsavefile: `${url}/api/Vault/savefile`,
*******/

@Injectable({
    providedIn: 'root',
})
export class VaultApiService {
    constructor(private http: HttpClient) {}

    getHello(): Observable<void> {
        return this.http.get<void>(Backend.vaulthello);
    }

    getVaults(): Observable<VaultCompleteResponse> {
        return this.http.get<VaultCompleteResponse>(Backend.vaultgetvaults);
    }

    getFolders(vaultId): Observable<FolderCompleteResponse> {
        return this.http.get<FolderCompleteResponse>(Backend.vaultgetfolders(vaultId));
    }

    getFolderTree(vaultId): Observable<FolderTreeResponse> {
        return this.http
            .get<RawFolderTreeResponse>(Backend.vaultgetfoldertree(vaultId))
            .pipe(
                map((raw: RawFolderTreeResponse) => raw.flatMap(e => lowerCaseKeysInArrayOfObjects(JSON.parse(e.tree))))
            );
    }

    getFolderTreeJson(vaultId): Observable<FolderTree> {
        return this.http.get<FolderTree>(Backend.vaultgetfoldertreejson(vaultId)).pipe(
            map(e => ({
                ...lowerCaseKeysInArrayOfObjects([e])[0],
                vaultId: Number(vaultId),
            }))
        );
    }

    getFiles(folderId): Observable<FileResponse> {
        return this.http.get<FileResponse>(Backend.vaultgetfiles(folderId));
    }

    getFile(fileId): Observable<File> {
        return this.http.get<File>(Backend.vaultviewfile(fileId));
    }

    addFolder(data: FolderComplete): Observable<FolderComplete> {
        return this.http.post<FolderComplete>(Backend.vaultsavefolder, data);
    }

    addVault(data: VaultComplete): Observable<VaultComplete> {
        return this.http.post<VaultComplete>(Backend.vaultsavevault, data);
    }

    addFile(data: File): Observable<File> {
        return this.http.post<any>(Backend.vaultsavefile, data);
    }

    deleteFile(file: File): Observable<any> {
        return this.http.post<any>(Backend.vaultdeletefile + '/' + file.fileId, {});
    }

    deleteFolder(id: number): Observable<any> {
        return this.http.post<any>(Backend.vaultdeletefolder(id), {});
    }

    deleteVault(vaultId: number | string): Observable<void> {
        return this.http.post<void>(Backend.vaultdeletevault(vaultId), {});
    }

    uploadFile(file: File): Observable<HttpEvent<File>> {
        return this.http.post<File>(Backend.vaultuploadfile, file, { reportProgress: true, observe: 'events' });
    }

    getTags(fileId): Observable<Tag[]> {
        return this.http.get<Tag[]>(Backend.vaultgettags(fileId));
    }

    addTag(tag: Tag): Observable<Tag> {
        return this.http.post<Tag>(Backend.vaultaddtag, tag);
    }

    deleteTag(tag: Tag): Observable<void> {
        return this.http.post<void>(Backend.vaultdeletetag, tag);
    }

    getNotifications(fileId): Observable<any> {
        return this.http.get(Backend.vaultgetnotifications(fileId));
    }

    addNotification(notification: Notification): Observable<Notification> {
        return this.http.post<Notification>(Backend.vaultsavenotification, notification);
    }

    deleteNotification(notification: Notification): Observable<void> {
        return this.http.post<void>(Backend.vaultdeletenotification, notification);
    }
}
