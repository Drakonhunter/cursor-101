# Task Manager - Component Structure

This Task Manager application has been refactored into a modular, professional structure with clear separation of concerns.

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Header.jsx      # Application header with title and subtitle
│   ├── TodoForm.jsx    # Form for adding new todos
│   ├── TodoStats.jsx   # Statistics display (completion count, progress)
│   ├── TodoActions.jsx # Import/export functionality for sharing todo lists
│   ├── TodoItem.jsx    # Individual todo item with actions
│   └── TodoList.jsx    # Container for todo items with empty state
├── hooks/              # Custom React hooks
│   └── useTodos.js     # Todo state management and localStorage persistence
├── App.jsx             # Main application component
├── App.css             # Global styles
└── main.jsx            # Application entry point
```

## Components

### Header
- Displays the application title and subtitle
- Simple presentational component

### TodoForm
- Handles input for new todos
- Manages form state and submission
- Generates random priority levels for new todos

### TodoStats
- Shows completion statistics
- Displays progress percentage
- Conditionally renders based on todo count

### TodoActions
- Provides import/export functionality for sharing todo lists
- Export: Downloads todos as a JSON file with timestamp
- Import: Reads JSON files and merges with existing todos
- Includes validation and duplicate prevention
- Perfect for sharing todo lists between users

### TodoItem
- Individual todo item with checkbox, text, status tag, and delete button
- Handles completion status and priority display
- Manages hover states and interactions

### TodoList
- Container for all todo items
- Handles empty state display
- Maps through todos and renders TodoItem components

## Custom Hooks

### useTodos
- Manages todo state and localStorage persistence
- Provides add, toggle, delete, and import functions
- Handles error handling for localStorage operations
- Automatically saves changes to localStorage
- Validates imported todo data and prevents duplicates

## Features

### Import/Export Functionality
- **Export**: Creates a timestamped JSON file with all todos
- **Import**: Reads JSON files and merges with existing todos
- **Validation**: Ensures imported data is valid
- **Duplicate Prevention**: Avoids adding todos that already exist
- **User Feedback**: Provides clear success/error messages

### Usage for Sharing
1. Export your todo list using the "📤 Export Todos" button
2. Send the generated JSON file to others
3. They can import it using the "📥 Import Todos" button
4. Their existing todos are preserved, new ones are added

## Benefits of This Structure

1. **Separation of Concerns**: Each component has a single responsibility
2. **Reusability**: Components can be easily reused or modified
3. **Maintainability**: Code is organized and easy to understand
4. **Testability**: Individual components can be tested in isolation
5. **Scalability**: Easy to add new features or modify existing ones
6. **Professional Structure**: Follows React best practices and conventions
7. **Sharing Capability**: Enables easy collaboration and todo list sharing

## State Management

The application uses a custom hook (`useTodos`) to manage state, which provides:
- Centralized state management
- localStorage persistence
- Clean API for todo operations
- Error handling for data persistence
- Import/export functionality with validation

This structure makes the codebase much more maintainable and follows modern React development patterns. 