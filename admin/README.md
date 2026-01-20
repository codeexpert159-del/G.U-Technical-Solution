# Admin System Documentation - G.U SOLUTIONS

## Overview
This admin system allows you to manage projects and services with full CRUD (Create, Read, Update, Delete) functionality. You can add, edit, and delete projects and services, including images and videos.

## Folder Structure

```
admin/
├── index.html              # Admin dashboard
├── projects.html           # Manage projects page
├── services.html           # Manage services page
├── logout.php              # Logout handler
├── api/                    # Backend API endpoints
│   ├── get-stats.php       # Get statistics (project/service count)
│   ├── get-projects.php    # Get all projects
│   ├── get-services.php    # Get all services
│   ├── add-project.php     # Add new project
│   ├── add-service.php     # Add new service
│   ├── update-project.php  # Update existing project
│   ├── update-service.php  # Update existing service
│   ├── delete-project.php  # Delete project
│   ├── delete-service.php  # Delete service
│   ├── upload-project-media.php  # Upload project images/videos
│   └── upload-service-media.php  # Upload service images/videos
├── data/                   # JSON data storage
│   ├── projects.json       # Projects data
│   └── services.json       # Services data
└── uploads/                # Uploaded media files
    ├── projects/           # Project images and videos
    └── services/           # Service images and videos
```

## Accessing the Admin Panel

1. **URL**: Navigate to `http://localhost/admin/index.html` (or your server URL)
2. **Dashboard**: View statistics and quick links to manage content

## Managing Projects

### Add a New Project
1. Click **"+ Add New Project"** button
2. Fill in the form:
   - **Title**: Project name
   - **Category**: Classification (e.g., Commercial, Residential)
   - **Description**: Short description
   - **Details**: Detailed information
   - **Project Image**: Upload project image (JPG, PNG, GIF)
   - **Project Video**: Upload project video (MP4, WebM)
   - **Status**: Select from Pending, In Progress, or Completed
3. Click **"Save Project"**

### Edit a Project
1. Find the project in the table
2. Click the **"Edit"** button
3. Update the fields as needed
4. Click **"Save Project"**

### Delete a Project
1. Find the project in the table
2. Click the **"Delete"** button
3. Confirm deletion in the popup

## Managing Services

### Add a New Service
1. Click **"+ Add New Service"** button
2. Fill in the form:
   - **Title**: Service name
   - **Description**: Short description
   - **Details**: Detailed information
   - **Icon**: Bootstrap Icon class (e.g., bi-gear, bi-diagram-3)
   - **Service Image**: Upload service image (JPG, PNG, GIF)
   - **Service Video**: Upload service video (MP4, WebM)
3. Click **"Save Service"**

### Edit a Service
1. Find the service in the table
2. Click the **"Edit"** button
3. Update the fields as needed
4. Click **"Save Service"**

### Delete a Service
1. Find the service in the table
2. Click the **"Delete"** button
3. Confirm deletion in the popup

## Data Storage

All data is stored in JSON format:

### projects.json
```json
[
  {
    "id": 1,
    "title": "Project Title",
    "category": "Commercial",
    "description": "Short description",
    "details": "Detailed information",
    "image": "project-image.jpg",
    "video": "project-video.mp4",
    "status": "completed",
    "date": "2024-01-15"
  }
]
```

### services.json
```json
[
  {
    "id": 1,
    "title": "Service Title",
    "description": "Short description",
    "details": "Detailed information",
    "icon": "bi-gear",
    "image": "service-image.jpg",
    "video": "service-video.mp4"
  }
]
```

## Displaying Content on Public Pages

To display projects and services on your public pages, use the content loader script:

### Step 1: Include the Script
Add this to your HTML head or before closing body tag:
```html
<link href="assets/css/admin.css" rel="stylesheet">
<script src="assets/js/content-loader.js"></script>
```

### Step 2: Display Projects
```html
<div id="projectsContainer"></div>

<script>
window.addEventListener('contentLoaderReady', () => {
  const container = document.getElementById('projectsContainer');
  container.innerHTML = contentLoader.projects
    .map(project => contentLoader.renderProjectCard(project))
    .join('');
});
</script>
```

### Step 3: Display Services
```html
<div id="servicesContainer"></div>

<script>
window.addEventListener('contentLoaderReady', () => {
  const container = document.getElementById('servicesContainer');
  container.innerHTML = contentLoader.services
    .map(service => contentLoader.renderServiceCard(service))
    .join('');
});
</script>
```

## Video Support

Videos are supported for both projects and services:
- **Formats**: MP4, WebM
- **Max Size**: 100MB per file
- **Playback**: Built-in HTML5 video player with controls

## Media Files

### Supported Formats
- **Images**: JPG, PNG, GIF
- **Videos**: MP4, WebM
- **Max Size**: 100MB per file

### Upload Paths
- Projects: `admin/uploads/projects/`
- Services: `admin/uploads/services/`

## File Permissions

Ensure the following directories are writable:
- `admin/data/` - for JSON files
- `admin/uploads/projects/` - for project media
- `admin/uploads/services/` - for service media

On Linux/Unix, run:
```bash
chmod 755 admin/data
chmod 755 admin/uploads/projects
chmod 755 admin/uploads/services
```

## API Endpoints

All API endpoints return JSON responses:

### Projects
- `GET admin/api/get-projects.php` - Get all projects
- `POST admin/api/add-project.php` - Add new project
- `POST admin/api/update-project.php` - Update project
- `POST admin/api/delete-project.php` - Delete project
- `POST admin/api/upload-project-media.php` - Upload media

### Services
- `GET admin/api/get-services.php` - Get all services
- `POST admin/api/add-service.php` - Add new service
- `POST admin/api/update-service.php` - Update service
- `POST admin/api/delete-service.php` - Delete service
- `POST admin/api/upload-service-media.php` - Upload media

### Statistics
- `GET admin/api/get-stats.php` - Get content counts

## Best Practices

1. **Naming**: Use descriptive, lowercase names for files (e.g., "modern-office-building.jpg")
2. **Optimization**: Compress images before uploading to improve page speed
3. **Videos**: Keep videos short (< 5 minutes) for faster loading
4. **Backup**: Regularly backup your `admin/data/` folder
5. **Status**: Use consistent project statuses (Pending, In Progress, Completed)

## Troubleshooting

### Files Not Uploading
- Check folder permissions (should be 755)
- Verify file size is under 100MB
- Ensure file format is supported

### Data Not Saving
- Check JSON file permissions
- Verify `admin/data/` folder exists
- Check PHP error logs for detailed errors

### Content Not Displaying
- Ensure `content-loader.js` is loaded before other scripts
- Check browser console for JavaScript errors
- Verify API endpoints are returning data

## Future Enhancements

Possible improvements:
- User authentication/login
- Multiple admin users with roles
- Database integration (MySQL)
- Image optimization/resizing
- Video encoding
- Content scheduling
- Analytics dashboard
- Version control/history

## Support

For issues or questions, check:
1. Browser console (F12) for JavaScript errors
2. Server error logs for PHP errors
3. JSON file formatting in `admin/data/`
