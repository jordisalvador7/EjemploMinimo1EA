export class Student {
    _id: String;
  name: String;
  address: String;
  phones: [{
    key: String;
    value: String;
  }]
  studies: [{
    name: String;
  }]

  constructor(_id = '', name = '', address = '', phones = null, studies = null) {
    this._id = _id;
    this.name = name;
    this.address = address;
    this.phones = phones;
    this.studies = studies;
  }
}
