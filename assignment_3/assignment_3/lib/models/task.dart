class Task {
  String title;
  String assignee;
  String priority;
  String description;

  Task({
    required this.title,
    required this.assignee,
    required this.priority,
    required this.description,
  });

  Task copyWith({
    String? title,
    String? assignee,
    String? priority,
    String? description,
  }) {
    return Task(
      title: title ?? this.title,
      assignee: assignee ?? this.assignee,
      priority: priority ?? this.priority,
      description: description ?? this.description,
    );
  }
}
