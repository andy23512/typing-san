import { Route } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { LessonPageComponent } from './pages/lesson-page/lesson-page.component';
import { SettingsPageComponent } from './pages/settings-page/settings-page.component';

export const APP_ROUTES: Route[] = [
  { path: '', pathMatch: 'full', component: HomePageComponent },
  { path: 'settings', component: SettingsPageComponent },
  { path: 'topic/:topicId/lesson/:lessonId', component: LessonPageComponent },
];
