import 'package:flutter/material.dart';
import '../models/task.dart';
import 'add_task_screen.dart';
import 'priority_list_widget.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  final List<Task> _tasks = [];
  int _selectedIndex = 0;
  Task? _recentlyDeleted;
  int? _recentlyDeletedIndex;

  void _addTask(Map<String, dynamic> newTask) {
    setState(() {
      _tasks.add(
        Task(
          title: newTask['title'],
          assignee: newTask['assignee'],
          priority: newTask['priority'],
        ),
      );
    });
  }

  void _deleteAt(int globalIndex, {bool showUndo = true}) {
    setState(() {
      _recentlyDeleted = _tasks.removeAt(globalIndex);
      _recentlyDeletedIndex = globalIndex;
    });

    if (showUndo) {
      ScaffoldMessenger.of(context).clearSnackBars();
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: const Text('Task deleted'),
          action: SnackBarAction(
            label: 'UNDO',
            onPressed: () {
              if (_recentlyDeleted != null && _recentlyDeletedIndex != null) {
                setState(() {
                  _tasks.insert(_recentlyDeletedIndex!, _recentlyDeleted!);
                  _recentlyDeleted = null;
                  _recentlyDeletedIndex = null;
                });
              }
            },
          ),
        ),
      );
    }
  }

  void _updateAt(int globalIndex, Task updated) {
    setState(() => _tasks[globalIndex] = updated);
  }

  List<Task> _filterTasks(String priority) {
    return _tasks.where((t) => t.priority == priority).toList();
  }

  // Build mapping: filtered list -> original global indexes
  List<int> _globalIndexesFor(String priority) {
    final List<int> indexes = [];
    for (int i = 0; i < _tasks.length; i++) {
      if (_tasks[i].priority == priority) indexes.add(i);
    }
    return indexes;
  }

  Widget _buildAllList() {
    if (_tasks.isEmpty) {
      return const Center(
        child: Text(
          'No tasks yet. Tap + to add one.',
          style: TextStyle(color: Colors.grey),
        ),
      );
    }
    return PriorityListWidget(
      title: 'All',
      tasks: List.from(_tasks),
      globalIndexes: List.generate(_tasks.length, (i) => i),
      onGlobalDelete: (globalIndex) => _deleteAt(globalIndex),
      onGlobalUpdate: (globalIndex, updated) => _updateAt(globalIndex, updated),
    );
  }

  Widget _buildPriorityView(String priority, String title) {
    final filtered = _filterTasks(priority);
    final globalIdx = _globalIndexesFor(priority);
    return PriorityListWidget(
      title: title,
      tasks: filtered,
      globalIndexes: globalIdx,
      onGlobalDelete: (globalIndex) => _deleteAt(globalIndex),
      onGlobalUpdate: (globalIndex, updated) => _updateAt(globalIndex, updated),
    );
  }

  Widget _getBody() {
    switch (_selectedIndex) {
      case 1:
        return _buildPriorityView('High', 'High');
      case 2:
        return _buildPriorityView('Medium', 'Medium');
      case 3:
        return _buildPriorityView('Low', 'Low');
      default:
        return _buildAllList();
    }
  }

  Color _fabColor() => Colors.deepPurple.shade200;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Task Manager'),
        centerTitle: true,
        elevation: 0,
        backgroundColor: Colors.transparent,
        foregroundColor: Colors.black87,
      ),
      body: SafeArea(
        child: AnimatedSwitcher(
          duration: const Duration(milliseconds: 300),
          child: _getBody(),
        ),
      ),
      bottomNavigationBar: BottomNavigationBar(
        currentIndex: _selectedIndex,
        type: BottomNavigationBarType.fixed,
        selectedItemColor: Colors.deepPurple,
        unselectedItemColor: Colors.grey,
        onTap: (i) => setState(() => _selectedIndex = i),
        items: const [
          BottomNavigationBarItem(icon: Icon(Icons.list), label: 'All'),
          BottomNavigationBarItem(icon: Icon(Icons.warning), label: 'High'),
          BottomNavigationBarItem(icon: Icon(Icons.flag), label: 'Medium'),
          BottomNavigationBarItem(icon: Icon(Icons.low_priority), label: 'Low'),
        ],
      ),
      floatingActionButton: FloatingActionButton(
        backgroundColor: _fabColor(),
        onPressed: () async {
          final newTask = await Navigator.push<Map<String, dynamic>?>(
            context,
            MaterialPageRoute(builder: (context) => const AddTaskScreen()),
          );
          if (newTask != null) _addTask(newTask);
        },
        child: const Icon(Icons.add),
      ),
    );
  }
}
