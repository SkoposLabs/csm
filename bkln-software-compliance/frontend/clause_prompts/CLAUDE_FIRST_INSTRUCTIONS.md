## Claude Instructions

You are an expert frontend designer and an expert software engineer. I need your help with writing the frontend for an internal application that helps monitor software installed by a user. You will be targeting an API to design particular components displayed to the user. 

I will expect, that at minimum I would have 3 key widgets: 

- A panel that shows whitelisted software - this can be a searchable list, and will require an add / delete / filter function
- A panel that shows the most recent uploaded file, along with a status function that shows either: 0 Unidentified Applications (Good) or the number of Unidentified Applications in Red.
- A panel that shows all past uploads, along with the option to upload a new file.

Finally, we should be able to run this easily with `bun` , a new runtime for typescript. 

## Component Design

I would like all the components to share a unified design style and they should have matching themes. 

## Theming

We should have the ability to change themes on the fly, and I should be able to toggle these easily. 

## Default Theme

The default theme and vibe that this application should exhibit are hard to describe for me manually, but I have included a set of samples for you to look at and generate. Please study these samples very carefully, as I want the frontend application to exhibit the same kind of theme. 

Please come up with a detailed action plan to accomplish these tasks. I am counting on you to create a well defined schematic, and see this project to completion! I have placed the images in @styles_to_check
