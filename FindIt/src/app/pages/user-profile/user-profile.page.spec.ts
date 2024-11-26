import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule, NavController } from '@ionic/angular';
import { UserProfilePage } from './user-profile.page';
import { AuthService } from 'src/app/services/auth.service';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';

describe('UserProfilePage', () => {
  let component: UserProfilePage;
  let fixture: ComponentFixture<UserProfilePage>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let navCtrlSpy: jasmine.SpyObj<NavController>;

  beforeEach(async () => {
    const authSpy = jasmine.createSpyObj('AuthService', ['destoyLocalStorageItem']);
    const navSpy = jasmine.createSpyObj('NavController', ['navigateForward']);

    await TestBed.configureTestingModule({
      declarations: [UserProfilePage],
      imports: [ReactiveFormsModule, IonicModule.forRoot(), RouterTestingModule],
      providers: [
        { provide: AuthService, useValue: authSpy },
        { provide: NavController, useValue: navSpy }
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(UserProfilePage);
    component = fixture.componentInstance;
    authServiceSpy = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    navCtrlSpy = TestBed.inject(NavController) as jasmine.SpyObj<NavController>;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with default values', () => {
    component.currentUser = { uid: '123', name: 'John Doe', email: 'john@example.com', password: 'password' };
    component.ngOnInit();
    expect(component.profileForm.value).toEqual({
      name: 'John Doe',
      email: 'john@example.com',
      profileImage: ''
    });
  });

  it('should disable the email field in the form', () => {
    component.currentUser = { uid: '123', name: 'John Doe', email: 'john@example.com', password: 'password' };
    component.ngOnInit();
    const emailField = component.profileForm.get('email');
    expect(emailField?.disabled).toBeTrue();
  });

  it('should call AuthService.destoyLocalStorageItem and navigate to login on logout', () => {
    component.logout();
    expect(authServiceSpy.destoyLocalStorageItem).toHaveBeenCalledWith('user');
    expect(navCtrlSpy.navigateForward).toHaveBeenCalledWith('/login');
  });

  it('should validate the form when updating profile', () => {
    component.ngOnInit();
    component.profileForm.setValue({
      name: '',
      email: 'john@example.com',
      profileImage: ''
    });
    expect(component.profileForm.valid).toBeFalse();

    component.profileForm.patchValue({ name: 'Updated Name' });
    expect(component.profileForm.valid).toBeTrue();
  });
});
