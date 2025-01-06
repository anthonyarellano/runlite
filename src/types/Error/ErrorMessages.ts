export enum ErrorMessages {
  PARSE_ERROR = "Error parsing user data file. Please ensure file was not tampered with, or revert to using a previous file.",
  FILE_VALIDATION = "Error parsing user data file. File is not a valid format.",
  NAME_MISSING = "Name is missing",
  NAME_LENGTH = "Name is longer than 50 characters",
  NAME_TYPE = "Name is not a string",
  METRIC_TYPE_MISSING = "Metric type is missing",
  METRIC_TYPE_TYPE = "Metric type is not mi or km",
  SHOE_ID_MISSING = "Shoe record is missing its id",
  SHOE_NAME_MISSING = "Shoe record is missing a name",
  SHOE_DISTANCE_MISSING = "Shoe record is missing a distance value",
  SHOE_DISTANCE_NEGATIVE = "Shoe record distance value is less than zero"
}
