import 'package:flutter/material.dart';
import '../models/task.dart';
import '../widgets/task_tile.dart';
import 'view_task_screen.dart';

class PriorityListWidget extends StatelessWidget {
  final String title;
  final List<Task> tasks;
  final void Function(int) onGlobalDelete;
  final void Function(int, Task) onGlobalUpdate;
  final List<int> globalIndexes;

  const PriorityListWidget({
    super.key,
    required this.title,
    required this.tasks,
    required this.onGlobalDelete,
    required this.onGlobalUpdate,
    required this.globalIndexes,
  });

  Color _getPriorityColor(String priority) {
    switch (priority) {
      case 'High':
        return Colors.red.shade100;
      case 'Medium':
        return Colors.orange.shade100;
      default:
        return Colors.green.shade100;
    }
  }

  @override
  Widget build(BuildContext context) {
    if (tasks.isEmpty) {
      return Center(
        child: Text(
          'No $title tasks',
          style: const TextStyle(color: Colors.grey),
        ),
      );
    }

    return ListView.builder(
      padding: const EdgeInsets.all(12),
      itemCount: tasks.length,
      itemBuilder: (context, idx) {
        final task = tasks[idx];
        final globalIndex = globalIndexes[idx];
        return Dismissible(
          key: Key('${task.title}-$globalIndex'),
          direction: DismissDirection.endToStart,
          onDismissed: (_) => onGlobalDelete(globalIndex),
          background: Container(
            color: Colors.red,
            alignment: Alignment.centerRight,
            padding: const EdgeInsets.symmetric(horizontal: 20),
            child: const Icon(Icons.delete, color: Colors.white),
          ),
          child: GestureDetector(
            onTap: () async {
              final updated = await Navigator.push<Task?>(
                context,
                MaterialPageRoute(
                  builder: (context) =>
                      ViewTaskScreen(task: task, globalIndex: globalIndex),
                ),
              );
              if (updated != null) onGlobalUpdate(globalIndex, updated);
            },
            child: TaskTile(
              title: task.title,
              assignee: task.assignee,
              priority: task.priority,
              color: _getPriorityColor(task.priority),
            ),
          ),
        );
      },
    );
  }
}
