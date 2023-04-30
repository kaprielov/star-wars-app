export const isValidCharacterId = (id: string): boolean => {
    return !isNaN(parseInt(id, 10)) && id === id.trim();
};
