import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule, NavController } from '@ionic/angular';
import { NotFoundPage } from './not-found.page';
import { RouterTestingModule } from '@angular/router/testing';

describe('NotFoundPage', () => {
  let component: NotFoundPage;
  let fixture: ComponentFixture<NotFoundPage>;
  let navCtrlSpy: jasmine.SpyObj<NavController>;

  beforeEach(async () => {
    const navSpy = jasmine.createSpyObj('NavController', ['navigateForward']);

    await TestBed.configureTestingModule({
      declarations: [NotFoundPage],
      imports: [IonicModule.forRoot(), RouterTestingModule],
      providers: [{ provide: NavController, useValue: navSpy }],
    }).compileComponents();

    fixture = TestBed.createComponent(NotFoundPage);
    component = fixture.componentInstance;
    navCtrlSpy = TestBed.inject(NavController) as jasmine.SpyObj<NavController>;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to "/home" when goHome is called', () => {
    component.goHome();
    expect(navCtrlSpy.navigateForward).toHaveBeenCalledWith('/home');
  });
});
