"""
Input validation utilities for API routes
"""
import re
from urllib.parse import urlparse


# Allowed fields for each entity type (whitelist approach)
ALLOWED_PROJECT_FIELDS = {
    'title', 'description', 'category', 'badge', 'url', 'thumbnail',
    'icon', 'gradient', 'tags', 'order', 'visible', 'createdAt', 'updatedAt'
}

ALLOWED_WEBSITE_FIELDS = {
    'title', 'description', 'category', 'badge', 'url',
    'icon', 'gradient', 'tags', 'order', 'visible', 'createdAt', 'updatedAt'
}

ALLOWED_SNIPPET_FIELDS = {
    'title', 'description', 'category', 'badge', 'url', 'thumbnail',
    'icon', 'gradient', 'tags', 'order', 'visible', 'createdAt', 'updatedAt'
}


def sanitize_string(value, max_length=500, allow_html=False):
    """Sanitize a string value"""
    if not isinstance(value, str):
        return str(value) if value is not None else ''

    # Truncate to max length
    value = value[:max_length]

    if not allow_html:
        # Basic HTML entity encoding for XSS prevention
        value = value.replace('&', '&amp;')
        value = value.replace('<', '&lt;')
        value = value.replace('>', '&gt;')
        value = value.replace('"', '&quot;')
        value = value.replace("'", '&#x27;')

    return value.strip()


def validate_url(url):
    """Validate URL format"""
    if not url:
        return True  # Empty URLs are allowed

    if not isinstance(url, str):
        return False

    # Allow relative URLs
    if url.startswith('/') or url.startswith('./') or url.startswith('../'):
        return True

    try:
        result = urlparse(url)
        # Must have scheme and netloc for absolute URLs
        return all([result.scheme in ('http', 'https', ''), result.netloc or url.startswith('/')])
    except Exception:
        return False


def validate_icon_class(icon):
    """Validate CSS icon class (Font Awesome format)"""
    if not icon:
        return True

    # Allow common icon class patterns
    pattern = r'^[a-zA-Z0-9\s\-_]+$'
    return bool(re.match(pattern, icon)) and len(icon) <= 100


def validate_gradient(gradient):
    """Validate CSS gradient string"""
    if not gradient:
        return True

    # Basic validation - starts with linear-gradient or radial-gradient
    valid_prefixes = ('linear-gradient', 'radial-gradient', '#', 'rgb', 'rgba')
    return any(gradient.strip().startswith(prefix) for prefix in valid_prefixes) and len(gradient) <= 500


def validate_tags(tags):
    """Validate tags array"""
    if not tags:
        return True, []

    if not isinstance(tags, list):
        return False, []

    # Sanitize each tag
    sanitized_tags = []
    for tag in tags[:20]:  # Max 20 tags
        if isinstance(tag, str):
            sanitized = sanitize_string(tag, max_length=50)
            if sanitized:
                sanitized_tags.append(sanitized)

    return True, sanitized_tags


def filter_allowed_fields(data, allowed_fields):
    """Filter data to only include allowed fields"""
    if not isinstance(data, dict):
        return {}
    return {k: v for k, v in data.items() if k in allowed_fields}


def validate_project_data(data, is_update=False):
    """Validate project data and return sanitized version"""
    errors = []
    sanitized = {}

    # Filter to allowed fields only
    data = filter_allowed_fields(data, ALLOWED_PROJECT_FIELDS)

    # Required fields (only for create)
    if not is_update:
        if not data.get('title'):
            errors.append("Title is required")
        if not data.get('url'):
            errors.append("URL is required")

    # Validate and sanitize each field
    if 'title' in data:
        sanitized['title'] = sanitize_string(data['title'], max_length=200)

    if 'description' in data:
        sanitized['description'] = sanitize_string(data['description'], max_length=1000)

    if 'category' in data:
        sanitized['category'] = sanitize_string(data['category'], max_length=100)

    if 'badge' in data:
        sanitized['badge'] = sanitize_string(data['badge'], max_length=50)

    if 'url' in data:
        if not validate_url(data['url']):
            errors.append("Invalid URL format")
        else:
            sanitized['url'] = data['url']

    if 'thumbnail' in data:
        if not validate_url(data['thumbnail']):
            errors.append("Invalid thumbnail URL format")
        else:
            sanitized['thumbnail'] = data['thumbnail']

    if 'icon' in data:
        if not validate_icon_class(data['icon']):
            errors.append("Invalid icon class format")
        else:
            sanitized['icon'] = data['icon']

    if 'gradient' in data:
        if not validate_gradient(data['gradient']):
            errors.append("Invalid gradient format")
        else:
            sanitized['gradient'] = data['gradient']

    if 'tags' in data:
        valid, tags = validate_tags(data['tags'])
        if not valid:
            errors.append("Invalid tags format")
        else:
            sanitized['tags'] = tags

    if 'order' in data:
        try:
            sanitized['order'] = int(data['order'])
        except (ValueError, TypeError):
            sanitized['order'] = 0

    if 'visible' in data:
        sanitized['visible'] = bool(data['visible'])

    if 'createdAt' in data:
        sanitized['createdAt'] = sanitize_string(str(data['createdAt']), max_length=50)

    if 'updatedAt' in data:
        sanitized['updatedAt'] = sanitize_string(str(data['updatedAt']), max_length=50)

    return errors, sanitized


def validate_website_data(data, is_update=False):
    """Validate website data - uses same logic as project"""
    data = filter_allowed_fields(data, ALLOWED_WEBSITE_FIELDS)
    return validate_project_data(data, is_update)


def validate_snippet_data(data, is_update=False):
    """Validate snippet data - uses same logic as project"""
    data = filter_allowed_fields(data, ALLOWED_SNIPPET_FIELDS)
    return validate_project_data(data, is_update)
