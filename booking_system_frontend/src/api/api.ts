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

        if(!result.ok) {
            console.log(result.json());
            throw new Error("super bad one");
        }

        const response = await result.json();
        console.log(response);
        return response;
    } catch (error) {
        console.error(error);
        throw new Error("super bad one");
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

export async function get(url: string) {
    try {
        const result = await fetch(url, {
            method: "GET",
            credentials: 'include'
        });

        if(!result.ok) {
            throw new Error("ang nais ko malaman mo ooh");
        }

        const response = await result.json();
        console.log(response);
        return response;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export async function update(url: string, body: any) {
    try {
        const result = await fetch(url, {
            method: "PATCH",
            credentials: 'include',
            body: JSON.stringify(body)
        });

        if(!result.ok) {
            const error = await result.json();
            console.log(error);
            throw new Error(error.message);
        }

        const response = await result.json();
        return response;
    } catch (error: any) {
        throw new Error(error);
    }
}