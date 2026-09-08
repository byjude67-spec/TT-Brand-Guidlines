#!/bin/bash
# Restores the user's global Claude Code config (~/.claude/CLAUDE.md) from this
# repo at the start of every session, since remote session containers are
# ephemeral and don't otherwise carry it forward.
#
# Safe by design: never fails session startup. If the source file can't be
# found, or is empty/unreadable, the existing ~/.claude/CLAUDE.md (if any) is
# left untouched.
set -uo pipefail

TARGET="$HOME/.claude/CLAUDE.md"

# This repo is normally checked out as a session source at
# /home/user/claude-config. Fall back to searching under $CLAUDE_PROJECT_DIR
# and /home/user in case the checkout path ever differs.
CANDIDATES=(
  "${CLAUDE_PROJECT_DIR:-}/CLAUDE.md"
  "/home/user/claude-config/CLAUDE.md"
)

SOURCE=""
for candidate in "${CANDIDATES[@]}"; do
  if [ -n "$candidate" ] && [ -s "$candidate" ]; then
    SOURCE="$candidate"
    break
  fi
done

if [ -z "$SOURCE" ]; then
  found=$(find /home/user -maxdepth 3 -type d -iname "claude-config" 2>/dev/null | head -n1)
  if [ -n "$found" ] && [ -s "$found/CLAUDE.md" ]; then
    SOURCE="$found/CLAUDE.md"
  fi
fi

if [ -z "$SOURCE" ]; then
  echo "session-start: claude-config CLAUDE.md not found in this session, leaving $TARGET as-is" >&2
  exit 0
fi

mkdir -p "$HOME/.claude"

if ! cmp -s "$SOURCE" "$TARGET" 2>/dev/null; then
  cp "$SOURCE" "$TARGET" && echo "session-start: restored global CLAUDE.md from $SOURCE"
fi

exit 0
