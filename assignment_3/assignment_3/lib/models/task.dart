class Task {
  String title;
  String assignee;
  String priority;

  Task({required this.title, required this.assignee, required this.priority});

  Task copyWith({String? title, String? assignee, String? priority}) {
    return Task(
      title: title ?? this.title,
      assignee: assignee ?? this.assignee,
      priority: priority ?? this.priority,
    );
  }
}
