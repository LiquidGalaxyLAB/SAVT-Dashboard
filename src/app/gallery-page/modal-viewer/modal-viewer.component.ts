import { Component, OnInit, trigger, state, style, transition, animate } from '@angular/core';

import { ImageService } from '../../shared/services/image.service';

/* Code imported from BenjaminBrandmeier's angular2-image-gallery project:
https://github.com/BenjaminBrandmeier/angular2-image-gallery
*/

@Component({
    selector: 'modal-viewer',
    templateUrl: './modal-viewer.component.html',
    styleUrls: ['./modal-viewer.component.css'],
     animations: [
         trigger('imageTransition', [
            state('enterFromRight', style({
                opacity: 1,
                transform: 'translate(0px, 0px)'
            })),
            state('enterFromLeft', style({
                opacity: 1,
                transform: 'translate(0px, 0px)'
            })),
            state('leaveToLeft', style({
                opacity: 0,
                transform: 'translate(-100px, 0px)'
            })),
            state('leaveToRight', style({
                opacity: 0,
                transform: 'translate(100px, 0px)'
            })),
            transition('* => enterFromRight', [
                style({
                    opacity: 0,
                    transform: 'translate(30px, 0px)'
                }),
                animate('250ms 500ms ease-in')
            ]),
            transition('* => enterFromLeft', [
                style({
                    opacity: 0,
                    transform: 'translate(-30px, 0px)'
                }),
                animate('250ms 500ms ease-in')
            ]),
            transition('* => leaveToLeft', [
                style({
                    opacity: 1
                }),
                animate('250ms ease-out')]
            ),
            transition('* => leaveToRight', [
                style({
                    opacity: 1
                }),
                animate('250ms ease-out')]
            )
        ]),
        trigger('showViewerTransition', [
            state('true', style({
                opacity: 1
            })),
            state('void', style({
                opacity: 0
            })),
            transition('void => *', [
                style({
                    opacity: 0
                }),
                animate('500ms ease-in')]
            ),
            transition('* => void', [
                style({
                    opacity: 1
                }),
                animate('500ms ease-out')]
            )
        ]),
        trigger('arrowTransitionLeft', [
            state('moveToLeft', style({
                transform: 'translateX(-500%)'
            })),
            state('return', style({
                transform: 'translateX(+0%)'
            })),
            transition('* => *', animate('500ms ease-out'))
        ]),
        trigger('arrowTransitionRight', [
            state('moveToRight', style({
                transform: 'translateX(+500%)'
            })),
            state('return', style({
                transform: 'translateX(+0%)'
            })),
            transition('* => *', animate('500ms ease-out'))
        ]),
    ]
})

export class ModalViewerComponent implements OnInit {
    
    private images: any[] = [{}];
    private currentIdx: number = 0
    private leftArrowVisible: boolean = true
    private rightArrowVisible: boolean = true
    private transform: number;
    private Math: Math;
    showViewer: boolean;
    showImageTitle: boolean;
    private moveArrow: string;
    
    constructor(
        private imageService: ImageService
    ) { }

    ngOnInit() {
        this.imageService.imagesUpdated$.subscribe(
            images => {
                this.images = images
            });
        this.imageService.imageSelectedIndexUpdated$.subscribe(
            newIndex => {
                this.currentIdx = newIndex
                this.images.forEach((image) => image['active'] = false)
                this.images[this.currentIdx]['active'] = true
                this.transform = 0
            });
        this.imageService.showImageViewerChanged$.subscribe(
            showViewer => {
                this.showViewer = showViewer
            });
        this.Math = Math
    }

     public get leftArrowActive(): boolean {
        return this.currentIdx > 0
    }

    public get rightArrowActive(): boolean {
        return this.currentIdx < this.images.length - 1
    }

    public pan(swipe: any) {
        this.transform = swipe.deltaX
    }

    public onResize() {
        this.images.forEach((image) => {
            image['viewerImageLoaded'] = false
            image['active'] = false
        })
        this.updateImage()
    }

    public imageLoaded(image : any) {
        image['viewerImageLoaded'] = true
    }

    public imageClick(image: any) {
        console.log(image);
    }

        /**
     * direction (-1: left, 1: right)
     * swipe (user swiped)
     */
    private navigate(direction: number, swipe: any) {
        if ((direction === 1 && this.currentIdx < this.images.length - 1) ||
            (direction === -1 && this.currentIdx > 0)) {

            if (direction == -1) {
                this.images[this.currentIdx]['transition'] = 'leaveToRight'
                this.images[this.currentIdx - 1]['transition'] = 'enterFromLeft'
                this.moveArrow = 'moveToLeft';
            }
            else {
                this.images[this.currentIdx]['transition'] = 'leaveToLeft'
                this.images[this.currentIdx + 1]['transition'] = 'enterFromRight'
                this.moveArrow = 'moveToRight';
            }
            this.currentIdx += direction
            this.updateImage()
        }
    }

    private hideNavigationArrows() {
        this.leftArrowVisible = false
        this.rightArrowVisible = false
    }

    private showNavigationArrows() {
        this.leftArrowVisible = true
        this.rightArrowVisible = true
    }

    private closeViewer() {
        this.images.forEach((image) => image['transition'] = undefined)
        this.images.forEach((image) => image['active'] = false)
        this.imageService.showImageViewer(false)
    }

    private updateImage() {
        // wait for animation to end
        setTimeout(() => {
            this.images[this.currentIdx]['active'] = true
            this.images.forEach((image) => {
                if (image != this.images[this.currentIdx]) {
                    image['active'] = false
                    this.transform = 0
                }
            })
            this.moveArrow = 'return';
        }, 500)
    }
}