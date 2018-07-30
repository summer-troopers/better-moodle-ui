import { SpecialtiesModule } from './specialties.module';

describe('SpecialtiesModule', () => {
  let specialitiesModule: SpecialtiesModule;

  beforeEach(() => {
    specialitiesModule = new SpecialtiesModule();
  });

  it('should create an instance', () => {
    expect(specialitiesModule).toBeTruthy();
  });
});
