import 'package:flutter/material.dart';

class TaskTile extends StatelessWidget {
  final String title;
  final String assignee;
  final String priority;
  final Color color;

  const TaskTile({
    super.key,
    required this.title,
    required this.assignee,
    required this.priority,
    required this.color,
  });

  IconData _iconForPriority(String p) {
    switch (p) {
      case 'High':
        return Icons.priority_high;
      case 'Medium':
        return Icons.flag;
      default:
        return Icons.low_priority;
    }
  }

  @override
  Widget build(BuildContext context) {
    return AnimatedContainer(
      duration: const Duration(milliseconds: 300),
      margin: const EdgeInsets.symmetric(vertical: 8),
      padding: const EdgeInsets.all(14),
      decoration: BoxDecoration(
        color: color,
        borderRadius: BorderRadius.circular(12),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withOpacity(0.03),
            blurRadius: 6,
            offset: const Offset(0, 3),
          ),
        ],
      ),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Icon(_iconForPriority(priority), size: 26, color: Colors.black54),
          const SizedBox(width: 12),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  title,
                  style: const TextStyle(
                    fontSize: 16,
                    fontWeight: FontWeight.bold,
                  ),
                ),
                const SizedBox(height: 6),
                Text('Assigned to: $assignee'),
                const SizedBox(height: 4),
                Text('Priority: $priority'),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
