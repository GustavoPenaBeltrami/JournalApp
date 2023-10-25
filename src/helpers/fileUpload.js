//Solo sube un archivo a la vez

export const fileUpload = async (file) => {
    if (!file) throw new Error('No tenemos ningun archivo a subir');
    const cloudUrl = 'https://api.cloudinary.com/v1_1/de6n6rzsg/image/upload';
    const formData = new FormData();
    formData.append('upload_preset', 'react-journal');
    formData.append('file', file);
    try {
        const resp = await fetch(cloudUrl, {
            method: 'POST',
            body: formData
        });
        if (resp.ok) {
            const cloudResp = await resp.json();
            return cloudResp.secure_url;
        } else {
            throw new Error('No se pudo subir el archivo');
        }
    } catch (error) {
        console.log(error);
        throw new Error(error.message);
    }
}