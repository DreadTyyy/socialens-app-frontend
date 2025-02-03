export const formattedLongDate = (date: string) => {
    return new Date(date).toLocaleDateString("id-ID", {
        day: "2-digit",
        month: "long",
        year: "numeric",
    });
}

export const formattedShortDate = (date: string) => {
    const formatted = new Date(date).toLocaleDateString("id-ID", { day: "2-digit", month: "short" });
    return formatted;
}

export const formattedShortFullDate = (date: string) => {
    return new Date(date).toLocaleDateString("id-ID", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    });
}
