export function sortProjectsByDate(projects: any[]) {
	return projects.sort((a, b) => {
		const parseProjectDate = (dateStr: string) => {
			if (dateStr.includes('Present') || dateStr.includes('present')) {
				return new Date(); // Return current date for "Present"
			}
			// Handle single dates or date ranges without "Present"
			return new Date(dateStr.split('-')[0].trim());
		};

		const dateA = parseProjectDate(a.date);
		const dateB = parseProjectDate(b.date);
		return dateB.getTime() - dateA.getTime();
	});
}
