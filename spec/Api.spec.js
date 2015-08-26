import Api from 'Api';

describe('Api', () => {
  let api = new Api();

  it('returns all elements', done => {
    api.elements().then(elements => {
      expect(elements[0].symbol).toEqual('H');
    }).then(done);
  });

  describe('isotopes', () => {
    it('returns isotopes of an element', done => {
      api.isotopes('H').then(isotopes => {
        expect(isotopes.length).toEqual(7);
        expect(isotopes[0].symbol).toEqual('H');
        expect(isotopes[1].symbol).toEqual('D');
        expect(isotopes[2].symbol).toEqual('T');
      }).then(done);
    });

    it('raises an error when given an unknown symbol', done => {
      api.isotopes('wtf')
        .catch(error => expect(error).toEqual('No element wtf'))
        .then(done);
    });
  });
});
