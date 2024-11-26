import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule, NavController } from '@ionic/angular';
import { ReportPage } from './report.page';
import { ProductService } from '../../services/product.service';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';

describe('ReportPage', () => {
  let component: ReportPage;
  let fixture: ComponentFixture<ReportPage>;
  let productServiceSpy: jasmine.SpyObj<ProductService>;
  let navCtrlSpy: jasmine.SpyObj<NavController>;

  beforeEach(async () => {
    const productSpy = jasmine.createSpyObj('ProductService', ['createLostProduct']);
    const navSpy = jasmine.createSpyObj('NavController', ['navigateForward']);

    await TestBed.configureTestingModule({
      declarations: [ReportPage],
      imports: [ReactiveFormsModule, IonicModule.forRoot(), RouterTestingModule],
      providers: [
        { provide: ProductService, useValue: productSpy },
        { provide: NavController, useValue: navSpy }
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ReportPage);
    component = fixture.componentInstance;
    productServiceSpy = TestBed.inject(ProductService) as jasmine.SpyObj<ProductService>;
    navCtrlSpy = TestBed.inject(NavController) as jasmine.SpyObj<NavController>;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with default values', () => {
    component.ngOnInit();
    expect(component.reportForm.value).toEqual({
      title: '',
      description: '',
      location: '',
      imageUrl: '',
      status: 'Reportado',
    });
    expect(component.reportForm.valid).toBeFalse();
  });

  it('should update the form when an image is selected', () => {
    const sampleImageBase64 = 'data:image/png;base64,sampleImageString';
    component.onImageSelected(sampleImageBase64);
    expect(component.selectedImage).toBe(sampleImageBase64);
    expect(component.reportForm.get('imageUrl')?.value).toBe(sampleImageBase64);
  });

  it('should not call ProductService.createLostProduct if the form is invalid', async () => {
    component.reportForm.setValue({
      title: '',
      description: '',
      location: '',
      imageUrl: '',
      status: 'Reportado',
    });

    await component.submitReport();

    expect(productServiceSpy.createLostProduct).not.toHaveBeenCalled();
    expect(navCtrlSpy.navigateForward).not.toHaveBeenCalled();
  });
});
