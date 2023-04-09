import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiImageLoaderDirective } from './directives/not-image/image-loader.directive';

// const EXPORT_COMPONENTS = [
//   CardComponent, SkeletonComponent,
//   InputTagSelectorComponent, ActorsSearchModalComponent,
//   ActorsInputSearchComponent, CompaniesInputSearchComponent,
//   CompaniesSearchModalComponent, ImageContainerComponent];

const EXPORT_DIRECTIVES = [UiImageLoaderDirective];

@NgModule({
  declarations: [...EXPORT_DIRECTIVES],
  imports: [
    CommonModule
  ],
  exports: [...EXPORT_DIRECTIVES]
})
export class SharedModule { }
