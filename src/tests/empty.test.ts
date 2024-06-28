import { Selector, fixture, test } from 'testcafe';

fixture`Error example`.page`./`;

test('Empty page', async (t) => {
  await t.expect(Selector('h1').innerText).eql('Test');
});
