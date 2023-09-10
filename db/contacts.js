const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require('nanoid')

const contactsPath = path.join(__dirname, "./contacts.json");

const listContacts = async() => {
    const list = await fs.readFile(contactsPath);
    return JSON.parse(list);
}

const getContactById = async (id) => {
    const list = await listContacts();
    const contact = list.find(t => t.id === id)
    return contact || null;
}

const addContact = async (data) => {
    const list = await listContacts();
    const newContact = {
        id: nanoid(),
        ...data
    };
    list.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(list, null, 2));
    return newContact;
}

const removeContact = async (id) => {
    const list = await listContacts();
    const contactIndex = list.findIndex(t => t.id === id)
    if (contactIndex === -1) {
        return null;
    }
    const [result] = list.splice(contactIndex, 1);
    await fs.writeFile(contactsPath, JSON.stringify(list, null, 2));
    return result;
}

const updatedContact = async (id, data) => {
    const list = await listContacts();
    const contactIndex = list.findIndex(t => t.id === id)
    if (contactIndex === -1) {
        return null;
    }
    list[contactIndex] = { id, ...data };
    await fs.writeFile(contactsPath, JSON.stringify(list, null, 2));
    return list[contactIndex];

}

module.exports = {
    listContacts,
    getContactById,
    addContact,
    removeContact,
    updatedContact
}