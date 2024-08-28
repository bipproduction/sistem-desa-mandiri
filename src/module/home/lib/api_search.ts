

export const funGetSearchAll = async (path?: string) => {
    const response = await fetch(`/api/home/search${(path) ? path : ''}`, { next: { tags: ['search'] } });
    return await response.json().catch(() => null);
}