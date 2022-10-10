type AvailableENVs = "dev" | "prod";

const mongo: Record<AvailableENVs, string> = {
    dev: "mongodb+srv://admin_Christian:databasep@ssword22@cluster0-r9zhj.mongodb.net/btyCollection?retryWrites=true&w=majority",
    prod: "",
};

const currentENV: AvailableENVs = "dev"

export const mongoDatabaseURL = mongo[currentENV];