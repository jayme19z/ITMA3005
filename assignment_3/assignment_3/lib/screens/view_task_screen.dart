import 'package:flutter/material.dart';
import '../models/task.dart';

class ViewTaskScreen extends StatefulWidget {
  final Task task;
  final int globalIndex; // index in the main list

  const ViewTaskScreen({
    super.key,
    required this.task,
    required this.globalIndex,
  });

  @override
  State<ViewTaskScreen> createState() => _ViewTaskScreenState();
}

class _ViewTaskScreenState extends State<ViewTaskScreen> {
  late TextEditingController _titleController;
  late TextEditingController _assigneeController;
  late String _priority;
  bool _isEditing = false;

  @override
  void initState() {
    super.initState();
    _titleController = TextEditingController(text: widget.task.title);
    _assigneeController = TextEditingController(text: widget.task.assignee);
    _priority = widget.task.priority;
  }

  void _toggleEditSave() {
    if (_isEditing) {
      final updated = widget.task.copyWith(
        title: _titleController.text.trim(),
        assignee: _assigneeController.text.trim(),
        priority: _priority,
        description: widget.task.description,
      );
      Navigator.of(context).pop(updated);
    } else {
      setState(() => _isEditing = true);
    }
  }

  @override
  void dispose() {
    _titleController.dispose();
    _assigneeController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(_isEditing ? 'Edit Task' : 'View Task'),
        actions: [
          IconButton(
            icon: Icon(_isEditing ? Icons.save : Icons.edit),
            onPressed: _toggleEditSave,
          ),
        ],
      ),
      body: SafeArea(
        child: Padding(
          padding: const EdgeInsets.all(16),
          child: Column(
            children: [
              TextField(
                controller: _titleController,
                enabled: _isEditing,
                decoration: const InputDecoration(labelText: 'Title'),
              ),
              const SizedBox(height: 12),
              TextField(
                controller: _assigneeController,
                enabled: _isEditing,
                decoration: const InputDecoration(labelText: 'Assignee'),
              ),
              const SizedBox(height: 12),
              DropdownButtonFormField<String>(
                value: _priority,
                decoration: const InputDecoration(labelText: 'Priority'),
                items: const [
                  DropdownMenuItem(value: 'Low', child: Text('Low')),
                  DropdownMenuItem(value: 'Medium', child: Text('Medium')),
                  DropdownMenuItem(value: 'High', child: Text('High')),
                ],
                onChanged: _isEditing
                    ? (v) => setState(() => _priority = v!)
                    : null,
              ),
              const SizedBox(height: 16),
              if (!_isEditing)
                Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    const Text('Tap edit to modify this task.'),
                    const SizedBox(height: 8),
                    Text(
                      'Description: ${widget.task.description.isEmpty ? 'No description provided' : widget.task.description}',
                    ),
                  ],
                ),
            ],
          ),
        ),
      ),
    );
  }
}
