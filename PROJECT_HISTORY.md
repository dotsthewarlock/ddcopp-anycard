# AnyCard Project History

## Purpose

## Major Decisions

- AnyCard now uses a named Target Window (`anycardTargetWindow`) so Generated Card Links and Bookmarklet workflows can attempt to reuse the same Popup Window.
- The original AnyCard Window may attempt to drive the Target Window through the Bookmarklet workflow, but browser same-origin security remains the source of truth.
- Because `anycard.ddcopp.com` and `www.anycard.ca` are different origins, direct cross-window DOM access may be blocked by browsers even when the Target Window is successfully reused.
- The supported fallback workflow is to run the Bookmarklet directly inside the Target Window when same-origin restrictions prevent remote filling.

## Features Implemented

## Known Issues

- Cross-origin browser restrictions may prevent the original AnyCard Window from directly filling the AnyCard Target Window.

## Future Ideas

## Lessons Learned

# Major Project Reviews