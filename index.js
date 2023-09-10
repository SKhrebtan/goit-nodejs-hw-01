const { program } = require('commander');

const contactsApp = require('./db/contacts')

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case 'list':
          const allContacts = await contactsApp.listContacts();
      return console.table(allContacts);

    case 'get':
      const contact = await contactsApp.getContactById(id)
      return console.log(contact);

    case 'add':
      const newContact = await contactsApp.addContact({name, email, phone});
      return console.log(newContact);

    case 'remove':
      const removedContact = await contactsApp.removeContact(id);
      return console.log(removedContact);
    
     case 'update':
      const updatedContact = await contactsApp.updatedContact(id, { name, email, phone });
      return console.log(updatedContact);

    default:
      console.warn('\x1B[31m Unknown action type!');
  }
}

program
    .option('-a, --action, <type>')
    .option('-i, --id, <type>')
    .option('-n, --name, <type>')
    .option('-e, --email, <type>')
    .option('-p, --phone, <type>')
    
program.parse();
const options = program.opts();

invokeAction(options)


