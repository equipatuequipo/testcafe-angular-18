import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { importProvidersFrom } from '@angular/core';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { map, type Observable } from 'rxjs';

class TranslateHttpYamlLoader extends TranslateLoader {
  constructor(
    private http: HttpClient,
    public prefix: string = './assets/locales/',
    public suffix: string = '.yaml'
  ) {
    super();
  }

  override getTranslation(lang: string): Observable<any> {
    return this.http
      .get(`${this.prefix}${lang}${this.suffix}`, {
        responseType: 'text',
      })
      .pipe(
        // This is the line that causes the error by modifying the underlying observable
        map((data) => data)
      );
  }
}

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(
      TranslateModule.forRoot({
        defaultLanguage: 'es-ES',
        loader: {
          provide: TranslateLoader,
          useClass: TranslateHttpYamlLoader,
          deps: [HttpClient],
        },
      })
    ),
  ],
}).catch((err) => console.error(err));
