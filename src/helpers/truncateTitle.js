function truncateTitle(title, maxLength = 60) {
    const truncated = title.substring(0, maxLength);
    const lastSpace = truncated.lastIndexOf(' ');

    if (title.length > maxLength) {
        return truncated.substring(0, lastSpace) + '...';
    } else {
        return title;
    }
}

export default truncateTitle;