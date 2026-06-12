export async function post(url: string, body: any) {

    const csrfToken = getCookie("XSRF-TOKEN");

    try {
        const result = await fetch(url, {
            method: "POST",
            credentials: 'include',
            body: JSON.stringify(body),
            headers: {
                "Content-Type": "application/json",
                "X-XSRF-TOKEN": csrfToken ?? ""
            },
        });

        const response = await result.json();
        console.log(response);
        return response;
    } catch (error) {
        console.error(error);
    }
}

function getCookie(name: string) {
    return document.cookie
        .split("; ")
        .find(row => row.startsWith(name + "="))
        ?.split("=")[1];
}