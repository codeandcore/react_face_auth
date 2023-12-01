import { addDoc, collection} from "firebase/firestore"; 
import { firestore } from "../firebaseConfig"

const collection_name = "users"

export const findAll = async () => {
    const doc_refs = await getDocs(collection(firestore(), collection_name))
    const res = []
    doc_refs.forEach(user => {
      res.push({
        id: user.id, 
        ...user.data()
      })
    })

    return res
}

