import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ProfilePictureTypeEnum } from 'app/shared/components/auxilium/user-center-profile.enum';

const DefaultImages = {
    [ProfilePictureTypeEnum.Picture]: 'images/avatars/default_avatar.jpg',
    [ProfilePictureTypeEnum.BackgroundImage]: 'images/cards/14-640x480.jpg',
};
@Pipe({
    name: 'getimage',
    pure: true,
})
export class GetImage implements PipeTransform {
    constructor(private _sanitizer: DomSanitizer) {}
    transform(value: string | null, pictureType: ProfilePictureTypeEnum = ProfilePictureTypeEnum.Picture): any {
        let imagePath;
        if (value === null || !value) {
            imagePath = this._sanitizer.bypassSecurityTrustUrl(DefaultImages[pictureType]);
            return imagePath;
        }
        const imageData = (value.includes('data:image') ? '' : 'data:image/jpg;base64,') + value;
        imagePath = this._sanitizer.bypassSecurityTrustResourceUrl(imageData);
        return imagePath;
    }
}
