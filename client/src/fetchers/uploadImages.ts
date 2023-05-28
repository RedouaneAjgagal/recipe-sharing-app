const uploadImages = async (images: Blob[], customUrl: string, name: string): Promise<{ src?: string[], msg?: string }> => {
    const formData = new FormData();

    images.map(item => {
        formData.append(name, item);
    });

    const reponse = await fetch(customUrl, {
        credentials: "include",
        method: "POST",
        body: formData
    });

    const data = await reponse.json();
    return data
}

export default uploadImages;