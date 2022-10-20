const extractSizeFromTitle = (arrayReferences) => {
    const allColors= [];
    const allSizes= [];
    arrayReferences.map(item => {
        if(item.includes("Black") || item.includes("Orange") || item.includes("Blue") || item.includes("White")) {
            allColors.push(item)
        } else{
            allColors.push("")
        }

        if(item.includes("34-37") || item.includes("38-42") || item.includes("43-47")) {
            allSizes.push(item)
        } else{
            allSizes.push("")
        }
    });
}

extractSizeFromTitle(allTitles)