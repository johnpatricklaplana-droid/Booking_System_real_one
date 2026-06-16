export async function post(url: string, body: any) {

    try {
        const result = await fetch(url, {
            method: "POST",
            credentials: 'include',
            body: JSON.stringify(body),
            headers: {
                "Content-Type": "application/json"
            },
        });

        const response = await result.json();
        console.log(response);
        return response;
    } catch (error) {
        console.error(error);
    }
}

export async function login(url: string, token: string) {
    try {
        const result = await fetch(url, {
            method: "POST",
            body: null,
            credentials: 'include',
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        const response = await result.json();
        console.log(response);
        return response;
    } catch (error) {
        console.error(error);
    }
}

export async function PostFormData(url: string, body: any) {

    try {
        const result = await fetch(url, {
            method: "POST",
            body: body,
            credentials: 'include'
        });

        const response = await result.json();
        console.log(response);
        return response;
    } catch (error) {
        console.error(error);
        return null;
    }
}
