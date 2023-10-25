import { collection, getDocs } from "firebase/firestore/lite"
import { FirebaseDB } from "../firebase/config"

export const loadNotes = async (uid = '') => {
    if (!uid) throw new Error('El id del usuario no existe!')

    const collectionRef = collection(FirebaseDB, `${uid}/journal/notes`);
    const dataDocument = await getDocs(collectionRef);
    const notes = []
    dataDocument.forEach(doc => {
        notes.push({id: doc.id, ...doc.data()})
    })
    console.log("NOTAS:",notes)
    return notes;
}