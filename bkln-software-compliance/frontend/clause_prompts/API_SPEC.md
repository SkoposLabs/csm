The API endpoints should be the following:

| **PATH** | **METHOD** | **Description** |
| --- | --- | --- |
| /file | POST | Takes a report, creates rows in the applications and devices table if they do not already exist

Creates a file entry representing this upload. Creates rows in installation_reports corresponding to the content in the file

Returns the file uuid that was created |
| /file | DELETE | deletes all rows associated with the file in installation_reports and the entry in files itself |
| /file/{file_uuid} | GET | gets all installation_reports rows associated with the file. It should accept the file uuid as a path parameter |
| /applications | GET | Gets a list of all applications |
| /applications/{application_uuid} | GET | Gets the application and a list of all the associated versions and when each version was created |
| /applications/{application_uuid}/devices | GET | Gets a list of all devices associated with a particular application and which version that they have installed |
| /applications/{application_uuid}/status | POST | Marks the all versions of the application with the status provided in the function body |
| /devices | GET | Gets a list of all devices |
| /devices/{device_uuid} | GET | Gets the device and all the applications installed on this device according to the most recent file associated with the device. |
| /devices/{device_uuid} | PATCH | Update the device owners name |
| /statuses | GET | gets all statuses |
| /report | GET | From the most recent file id, get a list of the following:
- device
- owner
- serial number
- application name
- application version
- status |
| /stats |  | Gets the stats to support the homepage |
