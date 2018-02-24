import { RoadRigAppPage } from './app.po';

describe('road-rig-app App', () => {
  let page: RoadRigAppPage;

  beforeEach(() => {
    page = new RoadRigAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
